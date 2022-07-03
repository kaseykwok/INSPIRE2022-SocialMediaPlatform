import { required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
    ...required,
    message: '{_field_} is required'
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
})