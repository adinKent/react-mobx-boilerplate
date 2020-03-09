import * as React from 'react';
import { observer } from 'mobx-react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import App from './App';
import Core from './components/Core';

interface Props { app: App }

@observer
class Root extends React.Component<Props, {}> {

  render() {
    const { route } = this.props.app;
    return (
      < MuiPickersUtilsProvider utils={DateFnsUtils} >
        <div>
          <Core children={route} />
        </div>
      </MuiPickersUtilsProvider >
    );
  }
}

export default Root;
