import React from 'react-native';
var {
	View,
  	Image,
  	TouchableHighlight
} = React;

import Io from "../../io";
var PlayPause = React.createClass({


	_playPause: function() {
		let {player} = this.props;
		console.log(Io);
		if (player && player.status === "PAUSED") {
			Io.socket.emit("player:resume", {name: player.name});
		} else if (player && player.status === "PLAYING") {
			Io.socket.emit("player:pause", {name: player.name});
		}
	},
	_pause: function() {
	},
	render: function() {
		let {player, style, styleImg} = this.props;
		var img = {url:"https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-left-01-512.png"};
		if (player && player.status === "PLAYING") {
			img = require("image!ic_pause_white_48dp");
		} else if (player && player.status === "PAUSED") {
			img = require("image!ic_play_circle_outline_white_48dp");
		}
		return (
			<TouchableHighlight
				  style={style}
				  onPress={this._playPause} >
					<Image
		              style={styleImg}
					  resizeMode={Image.resizeMode.stretch}
					  source={img} />
				</ TouchableHighlight>
		);
	}

});
module.exports = PlayPause;