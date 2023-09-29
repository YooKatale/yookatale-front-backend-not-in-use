"use client"
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const Partner = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    motorcycle: '',
    bicycle: '',
    van: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/submit-info', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        onSubmit('Data submitted successfully');
      } else {
        onSubmit('Error submitting data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      onSubmit('An unexpected error occurred');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="motorcycle">
            <FormLabel>Motorcycle Information</FormLabel>
            <Input
              type="text"
              name="motorcycle"
              placeholder="Motorcycle details"
              value={formData.motorcycle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="bicycle">
            <FormLabel>Bicycle Information</FormLabel>
            <Input
              type="text"
              name="bicycle"
              placeholder="Bicycle details"
              value={formData.bicycle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="van">
            <FormLabel>Van Information</FormLabel>
            <Input
              type="text"
              name="van"
              placeholder="Van details"
              value={formData.van}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" className="bg-green-500">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Partner;
