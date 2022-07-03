import { required, regex } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
    ...required,
    message: '{_field_} is required'
});

extend('regex', {
    ...regex,
});

extend('uniqueUsername', {
    validate(value, {usernameIsUnique}) {
      return usernameIsUnique;
    },
    params: ['usernameIsUnique'],
    message: '{_value_} is already existing. Please try another username.'
});

extend('equalTo', {
    validate(value, {otherValue}) {
        return value === otherValue;
    },
    params: ['otherValue'],
    message: '{_field_} incorrect.'
});

extend('before', {
    params: ['before'],
    validate(value, { before }){
        if(before!=='' && before!=null)
            return value.valueOf() <= before.valueOf()
        else   
            return true
    },
    message: 'The date must be on or before {_before_} below'
})

extend('after', {
    params: ['after'],
    validate(value, { after }){
        //console.log(value.valueOf(), (new Date(after)).valueOf())
        if(after!=='' && after!==null)
            return value.valueOf() >= after.valueOf()
        else   
            return true
    },
    message: 'The date must be on or after {_after_} above'
})