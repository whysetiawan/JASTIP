import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centerContainer: {
		flex: 1,
		alignItems:'center',
		justifyContent:'center'
	},
	startContainer: {
		alignSelf: 'flex-start'
	},
	indexTitle: {
		fontFamily: 'VINCHAND',
		fontSize: 24,
		color: '#FFFFFF',
		fontWeight: '500'
	},
	defaultButton: {
		width: 340,
		height: 50,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#FFFFFF',
		margin: 10
	},
	textDefaultButton: {
		fontSize: 16,
		color: '#FFFFFF',
	},
	defaultForm: {
		color: '#FFFFFF',
		width: 360,
		height: 40,
	},
	normalButtonText: {
		color: '#E2E2E2'
	}
})

export default styles;