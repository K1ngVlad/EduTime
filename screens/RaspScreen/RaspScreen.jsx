import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

  const fetchRasp = (week, weekDay, refresh) => {
    setLoading(() => true);
    ParseServise.getRasp(week, weekDay, refresh)
      .then((data) => {
        setRasp((rasp) => ({ ...rasp, ...data }));
        setError(() => null);
      })
      .catch((error) => {
        console.log(error.message);
        setError(() => error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const initRasp = () => {
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
  };

  useEffect(() => {
    initRasp();
  }, []);

  const onLeftPressHandler = () => {
    setRasp(() => ({ ...rasp, week: rasp.week - 1 }));
    fetchRasp(rasp.week - 1, rasp.weekDay, false);
  };

  const onRightPressHandler = () => {
    setRasp(() => ({ ...rasp, week: rasp.week + 1 }));
    fetchRasp(rasp.week + 1, rasp.weekDay, false);
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
            <View style={styles.weekButton}>
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
            <View style={styles.weekButton}>
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
        ) : !rasp.timeItems.length ? (
          <View style={styles.fullEmpety}>
            <Text style={styles.fullEmpetyText}>Сегодня пар нет</Text>
            <Text style={styles.fullEmpetyDescript}>Ура!</Text>
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => fetchRasp(rasp.week, rasp.weekDay, true)}
              />
            }
            data={rasp.timeItems}
            renderItem={({ item, index }) => (
              <RaspItem
                first={!index}
                time={item}
                item={rasp.scheduleItems[index]}
                scheduleItems={rasp.scheduleItems}
                index={index}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export { RaspScreen };
