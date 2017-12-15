import React from 'react';
import ReactDOM from 'react-dom';
import ReactHowler from 'react-howler';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { Howl } from 'howler';
import Dashboard from './components/Dashboard';
import TestDashboard from './components/TestDashboard';



ReactDOM.render(<Dashboard />, document.getElementById('app'));
