export default {
    ifequal(a,b, options){
        if(a ==b){
            return options.fn(this)
        }
        return options.inverse(this)
    },
    getFullNameFistCharacter(firstName, lastName){
        return firstName.charAt(0) + lastName.charAt(0)
    }
}