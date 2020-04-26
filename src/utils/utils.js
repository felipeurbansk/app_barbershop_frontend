import moment from 'moment';


export function formatDateApi( date ) {

    return moment(date).format('YYYY-MM-DD')

}