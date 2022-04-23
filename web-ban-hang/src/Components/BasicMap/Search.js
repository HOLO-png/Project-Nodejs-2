import React from 'react';
import PropTypes from 'prop-types';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

function Search(props) {
    const { lat, lng } = props;
    const panTo = React.useCallback(({ lat, lng }) => {}, []);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => lat, lng: () => lng },
            radius: 200 * 1000,
        },
    });

    return (
        <div className="search-address">
            <Combobox
                onSelect={async (address) => {
                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        // console.log(results[0]);
                    } catch (error) {
                        console.error('error!');
                    }
                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Nhập địa chỉ..."
                />
                <ComboboxPopover>
                    {status === 'OK' &&
                        data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

Search.propTypes = {};

export default Search;
