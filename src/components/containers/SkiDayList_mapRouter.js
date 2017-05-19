import SkiDayList from '../ui/SkiDayList'
import {
  removeDay
} from '../../actions'
import {
  connect
} from 'react-redux'


const mapStateToProps = (state, props) => {
  return {
    days: state.allSkiDays,
    filter: props.params.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveDay(date) {
      dispatch(removeDay(date))
    }
  }
}

/* No need to do because we created Container in SkiDayCount 
const Container = connect(mapStateToProps)(ShowErrors)
export default Container
*/

export default connect(mapStateToProps, mapDispatchToProps)(SkiDayList)



// export default (props) =>
//     <SkiDayList days={sample}
//                 filter={props.params.filter}
//                 onRemoveDay={date => console.log('remove day on', date)} />