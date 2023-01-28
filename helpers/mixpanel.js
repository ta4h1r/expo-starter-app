import Constants from 'expo-constants';

let mixpanel;
const token = '9c58a1ec9fe7386362811ff0710b3a34';

if (Constants.platform.web) {
    mixpanel = require('mixpanel-browser');
    mixpanel.init(token, {debug: true}); 
} else {
    const { ExpoMixpanelAnalytics } = require('@bothrs/expo-mixpanel-analytics');
    let mp = new ExpoMixpanelAnalytics(token);

    mixpanel = {
        identify: props => mp.identify(props),
        track: props => mp.track(props),
        people: {
            set: props => mp.people_set(props),
        }
    }
}


export default mixpanel;