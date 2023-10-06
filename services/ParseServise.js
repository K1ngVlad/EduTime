import parse from 'node-html-parser';
import { raspPath, facultyPath } from '../constants';
import { api } from '../api';
import { CacheService } from './CahceServise';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ParseServise {
  static async getFaculties() {
    try {
      CacheService.cache();
      const { data } = await api.get(raspPath);
      const root = parse(data);
      const faculties = root.querySelector('.faculties');
      const arr = Array.from(
        faculties.querySelectorAll('.faculties__item')
      ).map((item) => ({
        title: item.querySelector('a').text,
        href: item.querySelector('a').attrs.href,
      }));
      return arr;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getCourses() {
    try {
      const faculty = await AsyncStorage.getItem('faculty');
      const { data } = await api.get(`${facultyPath}/${faculty}?course=1`);
      const root = parse(data);
      const courses = root.querySelector('.nav-course');
      const arr = Array.from(courses.querySelectorAll('.nav-course__item')).map(
        (item) => ({
          title: item.querySelector('a').text,
          href: item.querySelector('a').attrs.href,
        })
      );
      return arr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getGroups() {
    try {
      const faculty = await AsyncStorage.getItem('faculty');
      const course = await AsyncStorage.getItem('course');
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
      return arr;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async initRasp() {
    try {
      const group = await AsyncStorage.getItem('group');
      const { data } = await api.get(`${raspPath}?groupId=${group}`);
      const root = parse(data);

      const weekElem = root.querySelector('.week-nav-current_week');
      const week = parseFloat(weekElem.text);

      // const date = root.querySelector('.week-nav-current_date').text;

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
          const discipline = dispElem.text.trim();
          const place = scheduleItem
            .querySelector('.schedule__place')
            .text.trim();
          const teacher = scheduleItem
            .querySelector('.schedule__teacher')
            .text.trim();
          const groups = scheduleItem
            .querySelector('.schedule__groups')
            .querySelectorAll('.schedule__group')
            .map((group) => group.text.trim());
          const comment = scheduleItem
            .querySelector('.schedule__comment')
            .text.trim();

          return { discipline, place, teacher, groups, comment };
        });

      return { week, weekDay, days, scheduleItems, timeItems, date };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getRasp(week, weekDay) {
    try {
      const group = await AsyncStorage.getItem('group');
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
          const discipline = dispElem.text.trim();
          const place = scheduleItem
            .querySelector('.schedule__place')
            .text.trim();
          const teacher = scheduleItem
            .querySelector('.schedule__teacher')
            .text.trim();
          const groups = scheduleItem
            .querySelector('.schedule__groups')
            .querySelectorAll('.schedule__group')
            .map((group) => group.text.trim());
          const comment = scheduleItem
            .querySelector('.schedule__comment')
            .text.trim();

          return { discipline, place, teacher, groups, comment };
        });

      return { date, timeItems, scheduleItems };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { ParseServise };
