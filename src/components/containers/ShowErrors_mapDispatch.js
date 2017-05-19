import ShowErrors from '../ui/ShowErrors'
import { clearError } from '../../actions'
import { connect } from 'react-redux' 

// export default () =>
// 	<ShowErrors errors={['sample error']}
// 						  onClearError={index => console.log('todo: clear error at', index)} />

const mapStateToProps = (state, props) => {
	return {
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {

	return{
		onClearError(index) {
			dispatch( clearError( index ) )
		}
	}
}

/* No need to do because we created Container in SkiDayCount 
const Container = connect(mapStateToProps)(ShowErrors)
export default Container
*/

export default connect(mapStateToProps, mapDispatchToProps)(ShowErrors)
