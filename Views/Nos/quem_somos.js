import React from "react"
import { View, Text } from "react-native"

export default class QuemSomos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: props.route.params.token,
            user_id: props.route.params.user_id,
        }
    }


    render(){
        return(
            <View>
                <Text>Texto</Text>
            </View>
        )
    }
}