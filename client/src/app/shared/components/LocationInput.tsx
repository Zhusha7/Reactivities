import {
  Box,
  debounce,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIqSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const LocationUrl =
    "https://api.locationiq.com/v1/autocomplete?key=pk.783e4c5e6060473643e7f00ba894f612&limit=5&dedupe=1&";

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const response = await axios.get<LocationIqSuggestion[]>(
            `${LocationUrl}q=${query}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [LocationUrl]
  );

  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: LocationIqSuggestion) => {
    const city =
      suggestion.address?.city ||
      suggestion.address?.town ||
      suggestion.address?.village ||
      "";
    const venue = suggestion.display_name;
    const latitude = suggestion.lat;
    const longitude = suggestion.lon;
    setInputValue(venue);
    field.onChange({ city, venue, latitude, longitude });
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <ListItemText primary={suggestion.display_name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
