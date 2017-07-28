import React from 'react';

import { 
  Grid
} from 'react-bootstrap';

export default class PublisherInfo extends React.Component {

  render() {
    return (
        <p>
        The where-are-you-from (WAYF) service is intended to reduce, or eliminate where possible, the friction that users/researchers 
        experience as they try to access content on different publisher platforms where they are presented with a very large number of 
        access options (e.g login, signup, institutional access, Social Logins etc). This goal is achieved by establishing an 
        architecture and methods where content providers can access information about the user's browsing/authentication history 
        and make intelligent decisions about the options which will allow the users to access their content, thus reducing the access 
        options to a minimal set that apply for the given user profile.
        <br /><br />
        For more information on the project, please visit <a href="http://wayf-cloud.readme.io">wayf-cloud.readme.io</a>
        </p>
    );
  }
}
