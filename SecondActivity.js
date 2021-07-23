/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

class SecondActivity extends Component
{
 static navigationOptions =
 {
    title: 'SecondActivity',
 };

 render()
 {
    return(
       <View style = { styles.MainContainer }>

          <Text style = { styles.TextStyle }> This is SecondActivity </Text>

       </View>
    );
 }
}