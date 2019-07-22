import {connect} from 'react-redux'

import {increase,decrease,increaseAsync} from '../redux/actions'
import Counter from '../components/counter'

export default connect(
  state => ({count: state}),
  {increase,decrease,increaseAsync}
)(Counter)