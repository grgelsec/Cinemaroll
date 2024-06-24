import { useState, useEffect } from "react";

//need to use promise.all to make a hook that runs movieids through a hook

//each list contains id and name
type List = {
  id: number;
  name: string;
};

//Array of list ids and names
type ListAPIResponse = {
  results: List[];
};