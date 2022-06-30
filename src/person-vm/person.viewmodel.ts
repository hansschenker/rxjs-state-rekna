import { map, merge, mergeMap, Observable, of, scan, Subject } from "rxjs";
import PersonService from "./person.service";
import { Person, PersonVm } from "./person.types";

class PersonViewModel {
    public vm$: Observable<PersonVm> = of({} as PersonVm);
    // track user actions
    public addAction = new Subject<Person>();
    public deleteAction = new Subject<Person>();
    public updateAction = new Subject<Person>();
    public selectAction = new Subject<Person>();

  constructor(private personService: PersonService) {
    // retrieving list of persons (could be a http request)
    const personsChanges = this.personService
      .getPersons()
      .pipe(map((persons) => (vm: PersonVm) => ({ ...vm, persons })));

    // select a person, get detail and set it on viewmodel
    const selectChanges = this.selectAction.pipe(
      mergeMap((person) => this.personService.getPersonDetail(person.id)),
      map((personDetail) => (vm: PersonVm) => ({ ...vm, personDetail }))
    );
    // add
    // don't forget to add addPerson$ to the merge operator
    const addChanges = this.addAction.pipe(
      // spread operator is used on the existing persons list
      // to add the new person
      map((newPerson) => (vm: PersonVm) => ({
        ...vm,
        persons: [...vm.persons!, newPerson],
      }))
    );

    /*** delete example ***/
    const deleteChanges = this.deleteAction.pipe(
      map((personToDelete) => (vm: PersonVm) => ({
        ...vm,
        persons: vm.persons!.filter((p) => p !== personToDelete),
      }))
    );

    /*** update example ***/

    const updateChanges = this.updateAction.pipe(
      map((person) => (vm: PersonVm) => {
        const index = vm.persons!.findIndex(
          (p) => p === person
        );
        // spread operator to maintain immutability of the persons array
        const persons = [
          ...vm.persons!.slice(0, index),
          person,
          ...vm.persons!.slice(index + 1),
        ];
        return { ...vm, persons };
      })
    );
    // in this example the initial viewmodel state is provided with the second
    // parameter of the scan function. Alternatively one could provide an initial
    // state with the rxjs of function
    this.vm$ = merge(
      personsChanges,
      selectChanges,
      addChanges,
      deleteChanges,
      updateChanges
    ).pipe(
      scan(
        (vm: PersonVm, mutationFn: (vm: PersonVm) => PersonVm) =>
          mutationFn(vm),
        { persons: [], person: null }
      )
    );
  }
}

export default PersonViewModel

