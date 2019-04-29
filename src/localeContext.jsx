import React from 'react';
import translate from 'counterpart';
import moment from 'moment';
import { registerLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';

export const LocaleContext = React.createContext();

export const LocaleContextProvider = props => {
  translate.setLocale(props.locale);
  translate.registerTranslations('en', require('../lang/en.json'));
  translate.registerTranslations('de', require('../lang/de.json'));
  registerLocale('de', de);

  return (
    <LocaleContext.Provider
      value={{
        locale: props.locale,
        moment: moment().locale(props.locale),
        numeral: props.numeral,
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  );
};

export const formatDate = (date, locale) => date.toLocaleDateString(locale, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
