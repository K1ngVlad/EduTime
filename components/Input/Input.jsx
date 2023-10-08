import { Image, TextInput, View } from 'react-native';
import { styles } from './style';
import { Svg, G, Path } from 'react-native-svg';
import { lightGray, white } from '../../constants';

const Input = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchbtn}>
        <Svg width={20} height={20} viewBox="0 -0.5 21 21" fill="#000000">
          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
          <G
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></G>
          <G id="SVGRepo_iconCarrier">
            <G
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <G
                id="Dribbble-Light-Preview"
                transform="translate(-299.000000, -280.000000)"
                fill="#ffffff"
              >
                <G id="icons" transform="translate(56.000000, 160.000000)">
                  <Path
                    d="M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z"
                    id="search_left-[#ffffff]"
                  ></Path>
                </G>
              </G>
            </G>
          </G>
        </Svg>
        {/* <Image source={require('../../assets/search.svg')} /> */}
      </View>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={lightGray}
      />
    </View>
  );
};

export { Input };
