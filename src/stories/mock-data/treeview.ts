export const DATA = {
  label: "Locations",
  isRoot: true,
  items: [
    {
      label: "Europe",
      isExpanded: true,
      items: [
        {
          label: "France",
          isExpanded: true,
          items: [
            {
              label: "Paris",
              isExpanded: true,
              items: [
                { label: "Eiffel Tower" },
                { label: "Louvre Museum" },
                { label: "Notre-Dame de Paris" },
              ],
            },
            {
              label: "Marseille",
              items: [{ label: "Vieux-Port" }],
            },
          ],
        },
        {
          label: "United Kingdom",
          isExpanded: true,
          items: [
            {
              label: "London",
              items: [{ label: "Big Ben" }, { label: "London Eye" }],
            },
            {
              label: "Edinburgh",
              items: [
                {
                  label: "Edinburgh Castle",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "North America",
      isExpanded: true,
      items: [
        {
          label: "United States",
          items: [
            {
              label: "New York",
              items: [
                { label: "Statue of Liberty" },
                { label: "Central Park" },
              ],
            },
            {
              label: "San Francisco",
              items: [{ label: "Golden Gate Bridge" }],
            },
          ],
        },
        {
          label: "Canada",
          items: [
            {
              label: "Toronto",
              items: [{ label: "CN Tower" }],
            },
            {
              label: "Vancouver",
              items: [{ label: "Stanley Park" }],
            },
          ],
        },
      ],
    },
    {
      label: "South America",
      isExpanded: true,
      items: [
        {
          label: "Brazil",
          isExpanded: true,
          items: [
            {
              label: "Rio de Janeiro",
              isExpanded: true,
              items: [
                { label: "Christ the Redeemer" },
                { label: "Copacabana Beach" },
                { label: "Ipanema Beach" },
              ],
            },
            {
              label: "São Paulo",
              items: [{ label: "São Paulo Museum of Art" }],
            },
          ],
        },
        {
          label: "Argentina",
          items: [
            {
              label: "Buenos Aires",
              items: [{ label: "Casa Rosada" }],
            },
            {
              label: "Mendoza",
              items: [{ label: "Aconcagua" }],
            },
          ],
        },
      ],
    },
    {
      label: "Asia",
      items: [
        {
          label: "Japan",
          items: [
            {
              label: "Tokyo",
              items: [{ label: "Tokyo Tower" }, { label: "Shibuya Crossing" }],
            },
            {
              label: "Kyoto",
              items: [{ label: "Fushimi Inari Shrine" }],
            },
          ],
        },
        {
          label: "India",
          items: [
            {
              label: "Delhi",
              items: [{ label: "India Gate" }],
            },
            {
              label: "Mumbai",
              items: [{ label: "Gateway of India" }],
            },
          ],
        },
      ],
    },
    {
      label: "Africa",
      items: [
        {
          label: "Egypt",
          items: [
            {
              label: "Cairo",
              items: [
                { label: "Pyramids of Giza" },
                { label: "Great Sphinx of Giza" },
                { label: "Khan el-Khalili" },
              ],
            },
            {
              label: "Luxor",
              items: [{ label: "Valley of the Kings" }, { label: "Karnak" }],
            },
          ],
        },
        {
          label: "South Africa",
          items: [
            {
              label: "Cape Town",
              items: [{ label: "Table Mountain" }],
            },
            {
              label: "Johannesburg",
              items: [{ label: "Constitution Hill" }],
            },
          ],
        },
      ],
    },
  ],
};
