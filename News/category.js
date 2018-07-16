import React,{Component} from 'react' ;
import { StyleSheet, Text, View,TouchableOpacity ,SafeAreaView, Button, ScrollView } from 'react-native';
import { Font } from 'expo';

export default class Category extends Component{

    static navigationOptions = {
        header : null
    }

    constructor(props){
        super(props);
        this.state = {fontLoaded: false , sources :[], category:this.props.category };
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

        //Getting the sources for given category
        const apiKey = 'e94a68aeda80448fb69bd7c5b6ea2aa3';
        const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
        const data = await response.json();
        let list =[] ;
        await data.sources.map(source => {
            if(source.category == this.state.category){
                list.push({
                    srcName: source.name,
                    srcId : source.id
                })
            }
        })
        this.setState({sources:list});
    }

    render(){
        return(
            <View style={styles.container}>
            {
              this.state.fontLoaded 
                ?<View style={{marginTop: 20 ,height: 90 }} >
                    <View>
                        <Text style={styles.header} > {this.state.category.toUpperCase()} </Text>
                    </View>
                    { this.state.sources
                        ?<ScrollView 
                            horizontal={true}
                            showsHorizontalScrollIndicator = {false} >
                            {this.state.sources.map((src) =>
                                <TouchableOpacity key={src.srcId} style={styles.source} onPress={ () => this.props.setSource(src.srcId)} >
                                    <Text style={styles.srcName} > {src.srcName} </Text>
                                </TouchableOpacity>
                            )}                                          
                        </ScrollView>
                        :null
                    }
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
    },
    source: {
      flex: 1,
      borderRadius: 3,
      backgroundColor: '#006064',
      justifyContent: 'center',
      marginTop: 5,
      marginRight: 5
    },
    header: {
      fontSize: 16,
      color: '#8bffdd',
      padding: 3
    },
    srcName:{
      fontSize: 16,
      color: '#b2ebf2'
    }
});
