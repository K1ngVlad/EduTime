import { View, Text } from 'react-native';
import { styles } from './styles';

const RaspItem = ({ time, item, scheduleItems, first, index }) => {
  if (!item) {
    if (scheduleItems[index - 1] === null) return <></>;
    return (
      <View
        style={
          scheduleItems[index + 1] === null ? styles.longEmpty : styles.empty
        }
      >
        <Text style={styles.emptyText}>Окно!</Text>
        <Text style={styles.emptyDescript}>Можно отдохнуть</Text>
      </View>
    );
  }

  const { discipline, place, teacher, groups, comment, subgroup } = item;

  return (
    <View style={first ? styles.containerFirst : styles.container}>
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

        {!groups && subgroup && (
          <View style={styles.groups}>
            <Text style={styles.group}>{subgroup}</Text>
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
