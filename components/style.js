import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f1'
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
		marginBottom:15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	bigTextSize : {
		fontSize: 20,
		color: '#222',
	},
	rowContainer: {
		flexDirection:'row',
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
	},
	headerCenterBorder:{
		borderWidth: 1,
		borderColor:'dodgerblue',
		padding:5
	},
	RowJastipScreen:{
		flexDirection:'row',
		justifyContent:'space-between',
		margin:14
	},
	TextTitleJastipScreen: {
		fontSize: 18,
		fontWeight:'700',
		color:'#222'
	},
	halfForm: {
		width: 170,
		margin:10
	},
	largeForm: {
		width: 360,
		height: 130,
		textAlignVertical:'top'
	},
	rowHeaderExplore:{
		alignItems:'center',
		justifyContent:'center',
		borderWidth:0.7,
		flex:1,
		height:40
	},
	exploreBoldText:{
		fontWeight:'bold',
		color:'#222',
		fontSize: 15
	},
	exploreContainerListview: {
		margin: 10,
	},
	listViewTrip: {
		backgroundColor:'#1E4072',
		height: 40,
		width: 300,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	listViewTripText: {
		color:'#FFFFFF',
		fontWeight:'500',
	},
	profileExtContainer: {
		margin:10,
		width:390,
	},
	bigBoltText: {
		fontSize: 17,
		fontWeight: 'bold',
		color:'#222',
	},
	relationsContainer: {
		width:'33%',
		alignItems:'center',
		justifyContent:'center',
		height:75,
	},
	smallButton: {
		width: 100,
		height: 35,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#222',
		margin: 10
}
})

export default styles;