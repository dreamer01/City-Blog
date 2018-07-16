import React,{Component} from 'react' ;
import { StyleSheet, Text, View ,SafeAreaView, ScrollView } from 'react-native';

import EventCard from './eventCard'

export default class Events extends Component{

    constructor(){
        super();
				this.state = {fontLoaded: false , events : ['001','003']};
    }

    render(){
        return(
            <View style={styles.container}>
				<ScrollView style={styles.cards}>
				    {this.state.events.map((id) => <EventCard key={id} eventId={id} />)}
                </ScrollView>
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'flex-start',
			backgroundColor: '#1c1a21'
		},
		cards:{
			marginTop: 20
		}
});