// Survey Data - CBC Choice Sets
const choiceSets = [
    {
        id: 1,
        options: [
            {
                id: 'A',
                facilities: 'Gym Only',
                packageType: 'Individual',
                timings: 'Morning & Evening Only',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Swimming Pool Only',
                packageType: 'Couple',
                timings: 'Extended Hours',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'Gym + Swimming Pool',
                packageType: 'Family',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 2,
        options: [
            {
                id: 'A',
                facilities: 'Badminton Court Only',
                packageType: 'Family',
                timings: 'All Day Access',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'B',
                facilities: 'Gym + Badminton Court',
                packageType: 'Individual',
                timings: 'Morning & Evening Only',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'C',
                facilities: 'Swimming Pool + Badminton Court',
                packageType: 'Couple',
                timings: 'Extended Hours',
                guestAccess: 'Not Allowed'
            }
        ]
    },
    {
        id: 3,
        options: [
            {
                id: 'A',
                facilities: 'Gym + Swimming Pool',
                packageType: 'Couple',
                timings: 'Extended Hours',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'All Facilities',
                packageType: 'Individual',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'C',
                facilities: 'Gym Only',
                packageType: 'Family',
                timings: 'Morning & Evening Only',
                guestAccess: 'Allowed at ₹200/visit'
            }
        ]
    },
    {
        id: 4,
        options: [
            {
                id: 'A',
                facilities: 'Swimming Pool Only',
                packageType: 'Individual',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'B',
                facilities: 'Gym + Swimming Pool + Badminton',
                packageType: 'Couple',
                timings: 'Morning & Evening Only',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'C',
                facilities: 'Badminton Court Only',
                packageType: 'Family',
                timings: 'Extended Hours',
                guestAccess: 'Allowed at ₹200/visit'
            }
        ]
    },
    {
        id: 5,
        options: [
            {
                id: 'A',
                facilities: 'Gym + Badminton Court',
                packageType: 'Family',
                timings: 'Morning & Evening Only',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'B',
                facilities: 'Swimming Pool Only',
                packageType: 'Individual',
                timings: 'Extended Hours',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'C',
                facilities: 'All Facilities',
                packageType: 'Couple',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 6,
        options: [
            {
                id: 'A',
                facilities: 'All Facilities',
                packageType: 'Individual',
                timings: 'Extended Hours',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'B',
                facilities: 'Gym + Swimming Pool',
                packageType: 'Family',
                timings: 'All Day Access',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'C',
                facilities: 'Swimming Pool + Badminton Court',
                packageType: 'Couple',
                timings: 'Morning & Evening Only',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 7,
        options: [
            {
                id: 'A',
                facilities: 'Gym Only',
                packageType: 'Couple',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'B',
                facilities: 'Badminton Court Only',
                packageType: 'Individual',
                timings: 'Morning & Evening Only',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'Gym + Swimming Pool + Badminton',
                packageType: 'Family',
                timings: 'Extended Hours',
                guestAccess: 'Not Allowed'
            }
        ]
    },
    {
        id: 8,
        options: [
            {
                id: 'A',
                facilities: 'Swimming Pool + Badminton Court',
                packageType: 'Family',
                timings: 'Morning & Evening Only',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Gym + Badminton Court',
                packageType: 'Couple',
                timings: 'All Day Access',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'All Facilities',
                packageType: 'Individual',
                timings: 'Extended Hours',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 9,
        options: [
            {
                id: 'A',
                facilities: 'Gym + Swimming Pool',
                packageType: 'Individual',
                timings: 'Extended Hours',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'B',
                facilities: 'Gym Only',
                packageType: 'Family',
                timings: 'All Day Access',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'C',
                facilities: 'Swimming Pool Only',
                packageType: 'Couple',
                timings: 'Morning & Evening Only',
                guestAccess: 'Allowed at ₹200/visit'
            }
        ]
    },
    {
        id: 10,
        options: [
            {
                id: 'A',
                facilities: 'Badminton Court Only',
                packageType: 'Couple',
                timings: 'Extended Hours',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Gym + Swimming Pool + Badminton',
                packageType: 'Individual',
                timings: 'All Day Access',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'Gym + Badminton Court',
                packageType: 'Family',
                timings: 'Morning & Evening Only',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 11,
        options: [
            {
                id: 'A',
                facilities: 'All Facilities',
                packageType: 'Family',
                timings: 'All Day Access',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Swimming Pool + Badminton Court',
                packageType: 'Individual',
                timings: 'Morning & Evening Only',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'Gym Only',
                packageType: 'Couple',
                timings: 'Extended Hours',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 12,
        options: [
            {
                id: 'A',
                facilities: 'Gym + Swimming Pool',
                packageType: 'Couple',
                timings: 'Morning & Evening Only',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'B',
                facilities: 'Badminton Court Only',
                packageType: 'Family',
                timings: 'Extended Hours',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'C',
                facilities: 'Swimming Pool Only',
                packageType: 'Individual',
                timings: 'All Day Access',
                guestAccess: 'Not Allowed'
            }
        ]
    },
    {
        id: 13,
        options: [
            {
                id: 'A',
                facilities: 'Gym + Badminton Court',
                packageType: 'Individual',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'B',
                facilities: 'All Facilities',
                packageType: 'Couple',
                timings: 'Morning & Evening Only',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'C',
                facilities: 'Gym + Swimming Pool + Badminton',
                packageType: 'Family',
                timings: 'Extended Hours',
                guestAccess: 'Allowed at ₹200/visit'
            }
        ]
    },
    {
        id: 14,
        options: [
            {
                id: 'A',
                facilities: 'Swimming Pool Only',
                packageType: 'Family',
                timings: 'Extended Hours',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Gym Only',
                packageType: 'Individual',
                timings: 'All Day Access',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'Swimming Pool + Badminton Court',
                packageType: 'Couple',
                timings: 'Morning & Evening Only',
                guestAccess: '2 Free passes/month'
            }
        ]
    },
    {
        id: 15,
        options: [
            {
                id: 'A',
                facilities: 'Gym + Swimming Pool + Badminton',
                packageType: 'Couple',
                timings: 'All Day Access',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Gym + Swimming Pool',
                packageType: 'Individual',
                timings: 'Morning & Evening Only',
                guestAccess: '2 Free passes/month'
            },
            {
                id: 'C',
                facilities: 'Badminton Court Only',
                packageType: 'Family',
                timings: 'Extended Hours',
                guestAccess: 'Allowed at ₹200/visit'
            }
        ]
    },
    {
        id: 16,
        options: [
            {
                id: 'A',
                facilities: 'All Facilities',
                packageType: 'Individual',
                timings: 'Morning & Evening Only',
                guestAccess: 'Not Allowed'
            },
            {
                id: 'B',
                facilities: 'Gym + Badminton Court',
                packageType: 'Couple',
                timings: 'Extended Hours',
                guestAccess: 'Allowed at ₹200/visit'
            },
            {
                id: 'C',
                facilities: 'Swimming Pool Only',
                packageType: 'Family',
                timings: 'All Day Access',
                guestAccess: '2 Free passes/month'
            }
        ]
    }
];
