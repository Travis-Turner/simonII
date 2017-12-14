import React from 'react';
import ReactDOM from 'react-dom';
import ReactHowler from 'react-howler';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { Howl } from 'howler';
import Dashboard from './components/Dashboard';



ReactDOM.render(<Dashboard />, document.getElementById('app'));
