import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
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
		fontSize: 28,
		color: '#222',
		fontWeight: 'bold'
	},
	defaultButton: {
		width: 340,
		height: 60,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1.7,
		borderRadius: 30,
		borderColor: '#222',
		margin: 10
	},
	textDefaultButton: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#222',
	},
	defaultForm: {
		color: '#222',
		width: 360,
		height: 50,
		fontSize: 16,
	},
})

export default styles;