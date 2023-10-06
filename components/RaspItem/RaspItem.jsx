import { View, Text } from 'react-native';
import { styles } from './styles';

const RaspItem = ({ time, item }) => {
  console.log(time);
  if (!item) {
    return (
      <View style={styles.empty}>
        <Text>Пусто</Text>
      </View>
    );
  }

  const { discipline, place, teacher, groups, comment } = item;

  // return (
  //   <View style={styles.empty}>
  //     <Text>Не пусто</Text>
  //   </View>
  // );

  return (
    <View style={styles.contaner}>
      <View style={styles.content}>
        <View style={styles.discipline}>
          <Text style={styles.disciplineText}>{discipline}</Text>
        </View>
        {place && (
          <View style={styles.place}>
            <Text>{place}</Text>
          </View>
        )}
        {teacher && (
          <View style={styles.teacher}>
            <Text>{teacher}</Text>
          </View>
        )}
        {groups && (
          <View style={styles.groups}>
            {groups.map((group) => (
              <Text key={group} style={styles.group}>
                {group}
              </Text>
            ))}
          </View>
        )}

        {comment && (
          <View style={styles.comment}>
            <Text>{comment}</Text>
          </View>
        )}
      </View>
      <View style={styles.time}>
        {time.length ? (
          time.map((item, i) => (
            <Text style={styles.timeText} key={i}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={styles.timeText}>{time}</Text>
        )}
      </View>
    </View>
  );
};

export { RaspItem };
