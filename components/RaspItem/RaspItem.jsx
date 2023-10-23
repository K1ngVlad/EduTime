import { View, Text } from 'react-native';
import { styles } from './styles';

const RaspItem = ({ time, item, scheduleItems, first, index }) => {
  if (!item[0]) {
    if (scheduleItems[index - 1] && !scheduleItems[index - 1].length)
      return <></>;
    return (
      <View
        style={
          scheduleItems[index + 1] && !scheduleItems[index + 1].length
            ? styles.longEmpty
            : styles.empty
        }
      >
        <Text style={styles.emptyText}>Окно!</Text>
        <Text style={styles.emptyDescript}>Можно отдохнуть</Text>
      </View>
    );
  }

  return (
    <View style={first ? styles.containerFirst : styles.container}>
      {item.map(
        (
          {
            discipline,
            place,
            teachers,
            groups,
            comment,
            subgroup,
            borderType,
          },
          index
        ) => (
          <View key={index} style={styles.lesson}>
            <View style={[styles.content, styles[borderType]]}>
              <View style={styles.discipline}>
                <Text style={styles.disciplineText}>{discipline}</Text>
              </View>
              {place && (
                <View style={styles.place}>
                  <Text>{place}</Text>
                </View>
              )}
              {teachers &&
                (Array.isArray(teachers) ? (
                  <View style={styles.teacher}>
                    {teachers.map((teacher) => (
                      <Text key={teacher}>{teacher}</Text>
                    ))}
                  </View>
                ) : (
                  <View style={styles.teacher}>
                    <Text>{teachers}</Text>
                  </View>
                ))}
              {Boolean(groups.length) && (
                <View style={styles.groups}>
                  {groups.map((group) => (
                    <Text key={group} style={styles.group}>
                      {group}
                    </Text>
                  ))}
                </View>
              )}

              {!groups.length && subgroup && (
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
            <View style={[styles.time, styles[`${borderType}time`]]}>
              {time.length ? (
                time.map((item, i) => (
                  <Text style={styles.timeText} key={i}>
                    {!index && item}
                  </Text>
                ))
              ) : (
                <Text style={styles.timeText}>{time}</Text>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export { RaspItem };
