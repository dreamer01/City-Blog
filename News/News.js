import React,{Component} from 'react' ;
import { StyleSheet, Text, View,TouchableOpacity ,SafeAreaView, Button, ScrollView } from 'react-native';
import { Font } from 'expo';
import Category from './category'

export default class News extends Component{

    static navigationOptions = {
        header : null
    }

    constructor(){
        super();
        this.state = {fontLoaded: false};
        this.setSource= this.setSource.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
          'Eczar': require('../assets/fonts/Eczar/Eczar-Medium.ttf'),
          'Fredericka the Great' : require('../assets/fonts/Fredericka_the_Great/FrederickatheGreat-Regular.ttf'),
          'Raleway': require('../assets/fonts/Raleway/Raleway-Medium.ttf'),
          'Lora': require('../assets/fonts/Lora/Lora-Regular.ttf'),
          'ElMessiri': require('../assets/fonts/El_Messiri/ElMessiri-Regular.ttf'),
          'Quicksand': require('../assets/fonts/Quicksand/Quicksand-Medium.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    setSource(src){
        this.props.navigation.navigate('NewsCard', { source: src });
    }

    render(){
        return(
            <View style={styles.container}>
            {
              this.state.fontLoaded 
                ?<View style={{marginTop: 20}} >
                    <ScrollView>
                        <Category category="general" setSource={this.setSource}/>
                        <Category category="technology" setSource={this.setSource}/>
                        <Category category="sports" setSource={this.setSource}/>
                        <Category category="entertainment" setSource={this.setSource}/>
                        <Category category="business" setSource={this.setSource}/>
                    </ScrollView>
                </View>
                : null
                }
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3e3947'
    }
});