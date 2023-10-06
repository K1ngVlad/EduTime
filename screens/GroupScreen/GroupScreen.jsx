import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';
import { CategoryItem } from '../../components/CategoryItem';

const GroupScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    ParseServise.getGroups()
      .then((data) => {
        setGroups(() => data);
        setError(() => null);
      })
      .catch((error) => setError(() => console.log(error.message)))
      .then(setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <CategoryItem
            type="group"
            navigation={navigation}
            title={item.title}
            href={item.href}
          />
        )}
      />
    </View>
  );
};

export { GroupScreen };
