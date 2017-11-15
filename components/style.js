import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fefefe'
	},
	centerContainer: {
		flex: 1,
		alignItems:'center',
		justifyContent:'center'
	},
	startContainer: {
		alignSelf: 'flex-start',
	},
	indexTitle: {
		fontFamily: 'VINCHAND',
		fontSize: 24,
		color: '#FFFFFF',
		fontWeight: '500'
	},
	customButton: {
		width: 340,
		height: 50,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#FFFFFF',
		margin: 10
	},
	customTextButton: {
		fontSize: 16,
		color: '#FFFFFF',
	},
	customForm: {
		color: '#FFFFFF',
		width: 360,
		height: 40,
	},
	normalCustomButtonText: {
		color: '#E2E2E2'
	},
	defaultCover: {
		backgroundColor: '#AAAAAA',
		width: '100%',
		height: 150,
		marginBottom:15
	},
	bigTextSize : {
		fontSize: 20,
		color: '#222',
	},
	rowContainer: {
		flexDirection:'row',
		height: 170,
	},
	mediumTextSize: {
		fontSize: 16,
		color: '#222'
	},
	normalTextSize: {
		color: '#222'
	},
	profileStyle: {
		width:'50%',
		alignItems: 'center',
	},
	followingStyle: {
		width: '50%',
		top: 30,
		alignItems:'center',
	},
	bigTextSize2: {
		fontSize: 18,
		color:'#222'
	},
	normalTextSize2: {
		fontSize: 16,
		color:'#222'
	},
	rowSpaceBetweenContainer: {
		flexDirection:'row',
		justifyContent:'space-between'
	},
	smallTextSize: {
		fontSize: 14,
		color: '#222'
	},
	homeTitle: {
		fontSize: 24,
		fontWeight: '500',
		color:'#222'
	},
	widthForm: {
		color: '#222',
		width: 360,
		height: 40,
	},
	defaultButton: {
			width: 340,
			height: 50,
			backgroundColor: 'transparent',
			alignItems: 'center',
			justifyContent: 'center',
			borderWidth: 1,
			borderColor: '#222',
			margin: 10
	},
	normalButtonText: {
		color:'#222'
	},
	largeProfileImage: {
		width: 125,
		height: 125,
		borderRadius: 62.5,
		alignSelf:'center',
		left:40,
	}
})

export default styles;