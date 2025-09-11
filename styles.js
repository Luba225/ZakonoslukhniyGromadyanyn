import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    calendarContainer: {
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'column',
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dayContainer: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 21,
    },
    dayText: {
        fontSize: 16,
    },
    otherMonthDay: {
        opacity: 0.3,
    },
    today: {
        backgroundColor: '#007bff',
        borderRadius: 21,
    },
    pressedDay: {
        backgroundColor: '#cce5ff',
        borderRadius: 21,
    },
    weekdayLabel: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
      },
      modalTitle: {
        fontSize: 20,
        marginBottom: 10,
      },
      violationItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 8,
      },
      closeButton: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
      },

});
