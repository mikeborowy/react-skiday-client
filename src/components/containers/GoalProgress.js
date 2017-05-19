import GoalProgress from '../ui/GoalProgress'
import { setGoal } from '../../actions' 
import { connect } from 'react-redux' 

const mapStateToProps = (state) => {
  return {
    current: state.allSkiDays.length,
    goal: state.goal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewGoal(goal) {
      dispatch(setGoal(goal))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalProgress)

// export default () =>
//     <GoalProgress current={10} 
//                   goal={20}
//                   onNewGoal={goal => console.log('todo: change goal', goal)} />
