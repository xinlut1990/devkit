/** @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with the Game Closure SDK.  If not, see <http://www.gnu.org/licenses/>.
 */

"use import";

import net.interfaces;

var Transport = exports = Class(net.interfaces.Transport, function() {
	this.init = function(win, prefix, clientID) {
		this._win = win;
		this._prefix = prefix + (clientID ? clientID + '<' : '');
		this._clientID = clientID;
	};
	
	this.makeConnection = function(protocol) {
		this._protocol = protocol;
	};
	
	this.write = function(data, encoding) {
		if (this.encoding == 'utf8') {
			this._win.postMessage(this._prefix + JSON.stringify({type: 'data', payload: utf8.encode(data)}), '*');
		} else {
			this._win.postMessage(this._prefix + JSON.stringify({type: 'data', payload: data}), '*');
		}
	};
	
	this.loseConnection = function(protocol) {
		this._win.postMessage(JSON.stringify({type: 'close', code: 301}), '*');
	};
	
	this.onData = function() {
		this._protocol.dataReceived.apply(this._protocol, arguments);
	};
	
	this.onClose = function() { this._protocol.connectionLost.apply(this._protocol, arguments); };
});

