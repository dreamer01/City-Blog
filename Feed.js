import React,{Component} from 'react' ;
import { StyleSheet, Text, View,TouchableOpacity ,SafeAreaView } from 'react-native';
import { Font } from 'expo';

export default class Feeds extends Component{

    constructor(){
        super();
        this.state = {fontLoaded: false};
    }

    async componentDidMount() {
        await Font.loadAsync({
          'Eczar': require('./assets/fonts/Eczar/Eczar-Medium.ttf'),
          'Fredericka the Great' : require('./assets/fonts/Fredericka_the_Great/FrederickatheGreat-Regular.ttf'),
          'Raleway': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
          'Lora': require('./assets/fonts/Lora/Lora-Regular.ttf'),
          'ElMessiri': require('./assets/fonts/El_Messiri/ElMessiri-Regular.ttf'),
          'Quicksand': require('./assets/fonts/Quicksand/Quicksand-Medium.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.fontLoaded 
                    ? <Text style={styles.text}> Heres your feeds.</Text>
                    : null
                }
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00af7c'
    },
    text: {
      fontFamily: 'ElMessiri',
      color: '#8bffdd',
      fontSize: 32
    }
});