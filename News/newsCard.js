import React,{Component} from 'react' ;
import fetch from 'node-fetch';
import { StyleSheet, Text, View,TouchableOpacity , Image ,SafeAreaView , ScrollView} from 'react-native';
import { Font } from 'expo';

export default class NewsCard extends Component{

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('source').replace('-',' ').toUpperCase(),
            headerStyle: {
                backgroundColor: '#181320',
              },
              headerTintColor: '#52e2ab',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15
              }
        };
    };
    /*
    static navigationOptions = {
        
    };*/

    constructor(){
        super();
        this.state = {fontLoaded: false , articles:[] };
    }

    async componentDidMount() {

        //loading custom from local
        await Font.loadAsync({
          'Eczar': require('../assets/fonts/Eczar/Eczar-Medium.ttf'),
          'Fredericka the Great' : require('../assets/fonts/Fredericka_the_Great/FrederickatheGreat-Regular.ttf'),
          'Raleway': require('../assets/fonts/Raleway/Raleway-Medium.ttf'),
          'Lora': require('../assets/fonts/Lora/Lora-Regular.ttf'),
          'ElMessiri': require('../assets/fonts/El_Messiri/ElMessiri-Regular.ttf'),
          'Quicksand': require('../assets/fonts/Quicksand/Quicksand-Medium.ttf')
        });

        this.setState({ fontLoaded: true });

        //Getting news articles from news api.
        const source = this.props.navigation.getParam('source', 'times-of-india');
        const apiKey = 'e94a68aeda80448fb69bd7c5b6ea2aa3';
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
        const data = await response.json();
        this.setState({articles:data.articles});

        //this.state.articles.map((article) => console.log(article.title));

    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                  {
                    this.state.fontLoaded 
                    ?this.state.articles.map((article) => 
                        <View key={article.title} style={styles.card}>
                            <View style={styles.txt} > 
                                <Text style={styles.title} > {article.title}</Text>
                            </View>
                            <Image style={styles.img} source={{uri: article.urlToImage}} />                            
                        </View>
                    )
                    : null
                  }
                </ScrollView>
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#52e2ab',
    },
    card :{
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#3e3947',
        padding: 5,
        marginBottom : 1,
        width : '100%'
    },
    txt:{
        flex:3,
        padding: 5
    },
    title: {
      fontFamily: 'Raleway',
      color: '#fff',
      fontSize: 15,
      textAlign: 'justify',
      lineHeight: 15,
    },
    description: {
        fontFamily: 'Lora',
        color: '#8bffdd',
        fontSize: 10
    },
    img: {
        flex: 1,
        padding: 5,
        width: '100%',
        height: 70
    }
});

/*
*/