export const defaultUser = {id: '', firstName: '', lastName: '', age: 0, email: ''};

export default function serializeUser(id, firstName, lastName, age, email) {
    const def = {...defaultUser};
    def.id = id;
    def.firstName = firstName;
    def.lastName = lastName;
    def.email = email;
    def.age = age;
    return def;
}

