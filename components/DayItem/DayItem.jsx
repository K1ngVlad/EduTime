import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ParseServise } from '../../services';

const DayItem = ({
  day,
  num,
  active,
  setRasp,
  weekDay,
  setLoading,
  setError,
  rasp,
}) => {
  const onPressHandler = () => {
    if (active) return;
    setRasp((rasp) => ({ ...rasp, weekDay }));
    setLoading(true);
    ParseServise.getRasp(rasp.week, weekDay)
      .then(({ date, timeItems, scheduleItems }) => {
        setError(null);
        setRasp((rasp) => ({
          ...rasp,
          date,
          timeItems,
          scheduleItems,
          weekDay,
        }));
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // .then(setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={active ? styles.numBoxActive : styles.numBox}>
          <View style={styles.num}>
            <Text style={active ? styles.numTextActive : styles.numText}>
              {num}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { DayItem };
