import { Observable, of } from 'rxjs';
import { Person } from './person.types.d';

class PersonService {
 getPersons(): Observable<Person[]> {
    return of([
        {id:1, name:'John', age:30},
        {id:2, name:'Jane', age:25},
        {id:3, name:'Bob', age:20}
    ]);
 }
 getPersonDetail(id: number): Observable<Person> {
    return of({id:id, name:'John', age:30});
 }
}

export default PersonService