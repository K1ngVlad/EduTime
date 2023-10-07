import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { items } from './items';
import { DayItem, ErrorElem, Loading, RaspItem } from '../../components';
import { ParseServise } from '../../services';

const RaspScreen = ({ navigation }) => {
  const [rasp, setRasp] = useState({
    weekDay: -1,
    week: 0,
    days: [0, 0, 0, 0, 0, 0],
    date: '00.00.0000',
    scheduleItems: [],
    timeItems: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    ParseServise.initRasp()
      .then((rasp) => {
        setRasp(() => rasp);
        setError(() => null);
      })
      .catch((error) => {
        console.log(error.message);
        setError(() => error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onLeftPressHandler = () => {
    setLoading(true);
    ParseServise.getRasp(rasp.week - 1, rasp.weekDay)
      .then(({ date, timeItems, scheduleItems }) => {
        setError(true);
        setRasp((rasp) => ({
          ...rasp,
          date,
          timeItems,
          scheduleItems,
          week: rasp.week - 1,
        }));
      })
      .catch((error) => {
        console.log(error.message);
        setError(false);
      })
      .then(setLoading(() => false));
  };

  const onRightPressHandler = () => {
    setLoading(true);
    ParseServise.getRasp(rasp.week + 1, rasp.weekDay)
      .then(({ date, timeItems, scheduleItems }) => {
        setError(null);
        setRasp((rasp) => ({
          ...rasp,
          date,
          timeItems,
          scheduleItems,
          week: rasp.week + 1,
        }));
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .then(setLoading(() => false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.days}>
          {items.map((item, i) => (
            <DayItem
              key={item}
              day={item}
              weekDay={i}
              num={rasp.days[i]}
              setRasp={setRasp}
              rasp={rasp}
              setLoading={setLoading}
              setError={setError}
              active={i === rasp.weekDay}
            />
          ))}
        </View>
        <View style={styles.weeks}>
          <TouchableOpacity onPress={onLeftPressHandler}>
            <View>
              <Text style={styles.weekButtonText}>{'<'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.week}>
            <View>
              <Text style={styles.weekText}>{`${rasp.week} неделя`}</Text>
            </View>
            <View>
              <Text>{rasp.date}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onRightPressHandler}>
            <View>
              <Text style={styles.weekButtonText}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorElem navigation={navigation} />
        ) : (
          <FlatList
            data={rasp.timeItems}
            renderItem={({ item, index }) => (
              <RaspItem
                first={!index}
                time={item}
                item={rasp.scheduleItems[index]}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export { RaspScreen };
