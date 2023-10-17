import parse from 'node-html-parser';
import { raspPath, facultyPath } from '../constants';
import { api } from '../api';
import { CacheService } from './CahceServise';
import AsyncStorage from '@react-native-async-storage/async-storage';

const trimRasp = (schedules, times) => {
  while (schedules[0] && !schedules[0].length) {
    schedules.shift();
    times.shift();
  }

  while (
    schedules[schedules.length - 1] &&
    !schedules[schedules.length - 1].length
  ) {
    schedules.pop();
    times.pop();
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

      if (!courses) {
        CacheService.cache(`courses_data_${faculty}`, 'Расписание не введено!');
        return 'Расписание не введено!';
      }

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

      const weekElem = root.querySelector('.week-nav-current_week');
      const week = parseFloat(weekElem?.text);
      const daysElem = root.querySelector('.weekday-nav');

      if (!daysElem) {
        const obj = {
          week: 1,
          weekDay: -1,
          days: [1, 2, 3, 4, 5, 6],
          scheduleItems: 'Расписание не введено!',
          timeItems: [],
          date: '01.09.2023',
        };

        CacheService.cache(`rasp_data_${group}`, obj);

        return obj;
      }

      const days = daysElem
        .querySelectorAll('.weekday-nav__item')
        .map((day) =>
          Number(day.querySelector('.weekday-nav__item-date')?.text.trim())
        );

      const dayActive = daysElem.querySelector('.weekday-nav__item_active');

      let dayElem = null;
      let day = 1;
      let weekDay = 1;
      let date = '00.00.00';
      if (dayActive) {
        dayElem = dayActive.querySelector('.weekday-nav__item-date');
        day = Number(dayElem?.text.trim());
        weekDay = days.findIndex((elem) => elem === day);
        date = root
          .querySelector('.schedule__items')
          .querySelectorAll('.schedule__head')
          [weekDay + 1].querySelector('.schedule__head-date')
          ?.text.trim();
      } else {
        const obj = await this.getRasp(week + 1, 0, false);
        const rasp = { ...obj, week: week + 1, weekDay: 0 };
        CacheService.cache(`rasp_data_${group}`, rasp);
        CacheService.cache(`rasp_data_${group}_${week}_${weekDay}`, rasp);
        return rasp;
      }

      const timeItems = root
        .querySelectorAll('.schedule__time')
        .map((time) =>
          time
            .querySelectorAll('.schedule__time-item')
            .map((timeItem) => timeItem.text.trim())
        );

      const scheduleItems = root
        .querySelectorAll('.schedule__item_show')
        .map((scheduleItem) =>
          scheduleItem
            .querySelectorAll('.schedule__lesson')
            .map((scheduleLesson) => {
              const dispElem = scheduleLesson.querySelector(
                '.schedule__discipline'
              );
              if (!dispElem) return null;

              let borderType = 'borderType5';

              if (scheduleLesson.classList.contains('lesson-border-type-1')) {
                borderType = 'borderType1';
              } else if (
                scheduleLesson.classList.contains('lesson-border-type-2')
              ) {
                borderType = 'borderType2';
              } else if (
                scheduleLesson.classList.contains('lesson-border-type-3')
              ) {
                borderType = 'borderType3';
              } else if (
                scheduleLesson.classList.contains('lesson-border-type-4')
              ) {
                borderType = 'borderType4';
              }

              const discipline = dispElem.text.trim();
              const place = scheduleLesson
                .querySelector('.schedule__place')
                .text.trim();
              const teachers = scheduleLesson
                .querySelector('.schedule__teacher')
                .querySelectorAll('.caption-text')
                .map((teacher) => teacher.text.trim());
              const groups = scheduleLesson
                .querySelector('.schedule__groups')
                .querySelectorAll('.schedule__group')
                .map((group) => group.text.trim());
              const subgroupElem = scheduleLesson
                .querySelector('.schedule__groups')
                .querySelector('.caption-text');
              const subgroup = subgroupElem ? subgroupElem.text.trim() : '';
              const comment = scheduleLesson
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
            })
        );

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
          return scheduleItem
            .querySelectorAll('.schedule__lesson')
            .map((scheduleLesson) => {
              const dispElem = scheduleLesson.querySelector(
                '.schedule__discipline'
              );
              if (!dispElem) return null;

              let borderType = 'borderType5';

              if (scheduleLesson.classList.contains('lesson-border-type-1')) {
                borderType = 'borderType1';
              } else if (
                scheduleLesson.classList.contains('lesson-border-type-2')
              ) {
                borderType = 'borderType2';
              } else if (
                scheduleLesson.classList.contains('lesson-border-type-3')
              ) {
                borderType = 'borderType3';
              } else if (
                scheduleLesson.classList.contains('lesson-border-type-4')
              ) {
                borderType = 'borderType4';
              }

              const discipline = dispElem.text.trim();
              const place = scheduleLesson
                .querySelector('.schedule__place')
                .text.trim();
              const teachers = scheduleLesson
                .querySelector('.schedule__teacher')
                .querySelectorAll('.caption-text')
                .map((teacher) => teacher.text.trim());
              const groups = scheduleLesson
                .querySelector('.schedule__groups')
                .querySelectorAll('.schedule__group')
                .map((group) => group.text.trim());
              const subgroupElem = scheduleLesson
                .querySelector('.schedule__groups')
                .querySelector('.caption-text');
              const subgroup = subgroupElem ? subgroupElem.text.trim() : '';
              const comment = scheduleLesson
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
        });

      trimRasp(scheduleItems, timeItems);

      CacheService.cache(`rasp_data_${group}_${week}_${weekDay}`, {
        date,
        timeItems,
        scheduleItems,
        days,
        week,
        weekDay,
      });

      return { date, timeItems, scheduleItems, days, week, weekDay };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { ParseServise };
