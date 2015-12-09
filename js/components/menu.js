var React = require('react-native');

const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  TouchableHighlight
} = React;

import RaspberryActionCreators from "../actions/RaspberryActionCreators";
import RaspberryStore from "../stores/RaspberryStore";


const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: '300'
  },
  raspberriesList: {
    paddingTop: 10,
    paddingBottom: 10
  }
});

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raspberries: [],
      showRaspberriesList: true
    }

    this.onRaspberriesChange = () => {
      this.setState({raspberries: RaspberryStore.getAll().raspberries});
    }
  }
  componentWillMount() {
    RaspberryActionCreators.getAll();
  }
  componentDidMount() {
    RaspberryStore.addChangeListener(this.onRaspberriesChange);
  }
  renderRaspberriesList() {
    let {raspberries, showRaspberriesList} = this.state;
    console.log(raspberries);
    if (showRaspberriesList) {
      return raspberries.map((rasp) => {
            return (
              <TouchableHighlight
                key={rasp.socketId}
                onPress={() => {this._selectedPi(rasp)}} >
                  <View><Text>{rasp.name}</Text></View>
              </TouchableHighlight>
            );
          });
    } else {
      return;
    }
  }
  render() {
    let {raspberries} = this.state;

    return (
      <ScrollView style={styles.menu}>
        <TouchableHighlight
          onPress={this.toogleRaspberriesList.bind(this)} >
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri, }}/>
            <Text style={styles.name}>Your name</Text>
            
          </View>
        </TouchableHighlight>
        <View style={styles.raspberriesList}>
          {this.renderRaspberriesList()}
        </View>

        <TouchableHighlight
          style={styles.clickable}
          onPress={this.gotoSearchMusic.bind(this)} >
            <Text style={styles.item}>Music</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
              onPress={() => {this.gotoMyArtists() }} >
          <Text style={styles.item}>My artists</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
  gotoMyArtists() {
    this.props.pushRoute({
      name:"myArtists"
    });
    this.props.closeMenu();
  }
  gotoSearchMusic() {
    this.props.pushRoute({
      name:"searchMusic"
    });
    this.props.closeMenu();
  }
  _selectedPi(pi) {
    RaspberryActionCreators.setSelectedRaspberry(pi);
  }
  toogleRaspberriesList() {
    let {showRaspberriesList} = this.state;
    console.log("set showRaspberriesList to " + (!showRaspberriesList));
    this.setState({showRaspberriesList: !showRaspberriesList});
  }
}
Menu.defaultProps = {pushRoute:function(){}};

export default Menu;