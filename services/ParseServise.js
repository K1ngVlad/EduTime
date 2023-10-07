import parse from 'node-html-parser';
import { raspPath, facultyPath } from '../constants';
import { api } from '../api';
import { CacheService } from './CahceServise';
import AsyncStorage from '@react-native-async-storage/async-storage';

const trimRasp = (schedules, times) => {
  while (schedules[0] === null) {
    schedules.shift();
    times.shift();
  }

  while (schedules[schedules.length - 1] === null) {
    schedules.pop();
    times.shift();
  }
};

class ParseServise {
  static async getFaculties(refresh) {
    try {
      if (!refresh) {
        const { cached, cachedData } = await CacheService.checkCache(
          'faculties_data'
        );

        if (cached) {
          return cachedData;
        }
      }

      const { data } = await api.get(raspPath);
      const root = parse(data);
      const faculties = root.querySelector('.faculties');
      const arr = Array.from(
        faculties.querySelectorAll('.faculties__item')
      ).map((item) => ({
        title: item.querySelector('a').text,
        href: item.querySelector('a').attrs.href,
      }));

      CacheService.cache('faculties_data', arr);

      return arr;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getCourses(refresh) {
    try {
      const faculty = await AsyncStorage.getItem('faculty');

      if (!refresh) {
        const { cached, cachedData } = await CacheService.checkCache(
          `courses_data_${faculty}`
        );

        if (cached) {
          return cachedData;
        }
      }

      const { data } = await api.get(`${facultyPath}/${faculty}?course=1`);
      const root = parse(data);
      const courses = root.querySelector('.nav-course');
      const arr = Array.from(courses.querySelectorAll('.nav-course__item')).map(
        (item) => ({
          title: item.querySelector('a').text,
          href: item.querySelector('a').attrs.href,
        })
      );

      CacheService.cache(`courses_data_${faculty}`, arr);

      return arr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getGroups(refresh) {
    try {
      const faculty = await AsyncStorage.getItem('faculty');
      const course = await AsyncStorage.getItem('course');

      if (!refresh) {
        const { cached, cachedData } = await CacheService.checkCache(
          `groups_data_${faculty}_${course}`
        );

        if (cached) {
          return cachedData;
        }
      }

      const { data } = await api.get(
        `${facultyPath}/${faculty}?course=${course}`
      );
      const root = parse(data);
      const arr = Array.from(
        root.querySelectorAll('.group-catalog__group')
      ).map((item) => ({
        title: item.querySelector('span').text,
        href: item.attrs.href,
      }));

      CacheService.cache(`groups_data_${faculty}_${course}`, arr);

      return arr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async initRasp() {
    try {
      const group = await AsyncStorage.getItem('group');

      const { cached, cachedData } = await CacheService.checkCache(
        `rasp_data_${group}`
      );

      if (cached) {
        return cachedData;
      }

      const { data } = await api.get(`${raspPath}?groupId=${group}`);
      const root = parse(data);

      const timetable = root.querySelector('.timetable-card');

      const weekElem = root.querySelector('.week-nav-current_week');
      const week = parseFloat(weekElem.text);

      const daysElem = root.querySelector('.weekday-nav');

      const days = daysElem
        .querySelectorAll('.weekday-nav__item')
        .map((day) =>
          Number(day.querySelector('.weekday-nav__item-date').text.trim())
        );

      const dayElem = daysElem
        .querySelector('.weekday-nav__item_active')
        .querySelector('.weekday-nav__item-date');

      const day = Number(dayElem.text.trim());

      const weekDay = days.findIndex((elem) => elem === day);

      console.log('алло');
      if (!timetable) {
        console.log('рассписание не введено');
        CacheService.cache(`rasp_data_${group}`, 'Расписание пока не введено!');

        CacheService.cache(
          `rasp_data_${group}_${week}_${weekDay}`,
          'Расписание пока не введено!'
        );

        return 'Рассписание пока не введено!';
      }

      const date = root
        .querySelector('.schedule__items')
        .querySelectorAll('.schedule__head')
        [weekDay + 1].querySelector('.schedule__head-date')
        .text.trim();

      const timeItems = root
        .querySelectorAll('.schedule__time')
        .map((time) =>
          time
            .querySelectorAll('.schedule__time-item')
            .map((timeItem) => timeItem.text.trim())
        );

      const scheduleItems = root
        .querySelectorAll('.schedule__item_show')
        .map((scheduleItem) => {
          const dispElem = scheduleItem.querySelector('.schedule__discipline');
          if (!dispElem) return null;

          const lesson = scheduleItem.querySelector('.schedule__lesson');
          let borderType = 'borderType5';

          if (lesson.classList.contains('lesson-border-type-1')) {
            borderType = 'borderType1';
          } else if (lesson.classList.contains('lesson-border-type-2')) {
            borderType = 'borderType2';
          } else if (lesson.classList.contains('lesson-border-type-3')) {
            borderType = 'borderType3';
          } else if (lesson.classList.contains('lesson-border-type-4')) {
            borderType = 'borderType4';
          }

          const discipline = dispElem.text.trim();
          const place = scheduleItem
            .querySelector('.schedule__place')
            .text.trim();
          const teachers = scheduleItem
            .querySelector('.schedule__teacher')
            .querySelectorAll('.caption-text')
            .map((teacher) => teacher.text.trim());
          const groups = scheduleItem
            .querySelector('.schedule__groups')
            .querySelectorAll('.schedule__group')
            .map((group) => group.text.trim());
          const subgroupElem = scheduleItem
            .querySelector('.schedule__groups')
            .querySelector('.caption-text');
          const subgroup = subgroupElem ? subgroupElem.text.trim() : '';
          const comment = scheduleItem
            .querySelector('.schedule__comment')
            .text.trim();

          return {
            discipline,
            place,
            teachers,
            groups,
            comment,
            subgroup,
            borderType,
          };
        });

      trimRasp(scheduleItems, timeItems);

      CacheService.cache(`rasp_data_${group}`, {
        week,
        weekDay,
        days,
        scheduleItems,
        timeItems,
        date,
      });

      CacheService.cache(`rasp_data_${group}_${week}_${weekDay}`, {
        date,
        timeItems,
        scheduleItems,
      });

      return { week, weekDay, days, scheduleItems, timeItems, date };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRasp(week, weekDay, refresh) {
    try {
      const group = await AsyncStorage.getItem('group');

      if (!refresh) {
        const { cached, cachedData } = await CacheService.checkCache(
          `rasp_data_${group}_${week}_${weekDay}`
        );

        if (cached) {
          return cachedData;
        }
      }

      const { data } = await api.get(
        `${raspPath}?groupId=${group}&selectedWeek=${week}&selectedWeekday=${
          weekDay + 1
        }`
      );
      const root = parse(data);

      const timetable = root.querySelector('.timetable-card');

      if (!timetable) {
        console.log('рассписание не введено');
        CacheService.cache(
          `rasp_data_${group}_${week}_${weekDay}`,
          'Расписание пока не введено!'
        );

        return 'Рассписание пока не введено!';
      }

      const date = root
        .querySelector('.schedule__items')
        .querySelectorAll('.schedule__head')
        [weekDay + 1].querySelector('.schedule__head-date')
        .text.trim();

      const daysElem = root.querySelector('.weekday-nav');

      const days = daysElem
        .querySelectorAll('.weekday-nav__item')
        .map((day) =>
          Number(day.querySelector('.weekday-nav__item-date').text.trim())
        );

      const timeItems = root
        .querySelectorAll('.schedule__time')
        .map((time) =>
          time
            .querySelectorAll('.schedule__time-item')
            .map((timeItem) => timeItem.text.trim())
        );

      const scheduleItems = root
        .querySelectorAll('.schedule__item_show')
        .map((scheduleItem) => {
          const dispElem = scheduleItem.querySelector('.schedule__discipline');
          if (!dispElem) return null;

          const lesson = scheduleItem.querySelector('.schedule__lesson');
          let borderType = 'borderType5';
          if (lesson.classList.contains('lesson-border-type-1')) {
            borderType = 'borderType1';
          } else if (lesson.classList.contains('lesson-border-type-2')) {
            borderType = 'borderType2';
          } else if (lesson.classList.contains('lesson-border-type-3')) {
            borderType = 'borderType3';
          } else if (lesson.classList.contains('lesson-border-type-4')) {
            borderType = 'borderType4';
          }

          const discipline = dispElem.text.trim();
          const place = scheduleItem
            .querySelector('.schedule__place')
            .text.trim();
          const teachers = scheduleItem
            .querySelector('.schedule__teacher')
            .querySelectorAll('.caption-text')
            .map((teacher) => teacher.text.trim());
          const groups = scheduleItem
            .querySelector('.schedule__groups')
            .querySelectorAll('.schedule__group')
            .map((group) => group.text.trim());
          const subgroupElem = scheduleItem
            .querySelector('.schedule__groups')
            .querySelector('.caption-text');
          const subgroup = subgroupElem ? subgroupElem.text.trim() : '';
          const comment = scheduleItem
            .querySelector('.schedule__comment')
            .text.trim();

          return {
            discipline,
            place,
            teachers,
            groups,
            comment,
            subgroup,
            borderType,
          };
        });

      trimRasp(scheduleItems, timeItems);

      CacheService.cache(`rasp_data_${group}_${week}_${weekDay}`, {
        date,
        timeItems,
        scheduleItems,
        days,
      });

      return { date, timeItems, scheduleItems, days };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { ParseServise };
