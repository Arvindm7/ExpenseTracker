import React from 'react';
import styled from 'styled-components';

const PRESETS = [
    { key: 'all', label: 'All Time', icon: 'fa-infinity' },
    { key: 'week', label: 'This Week', icon: 'fa-calendar-week' },
    { key: 'month', label: 'This Month', icon: 'fa-calendar-days' },
    { key: 'lastMonth', label: 'Last Month', icon: 'fa-calendar-minus' },
    { key: 'year', label: 'This Year', icon: 'fa-calendar' },
];

export function getDateRange(preset) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (preset) {
        case 'week': {
            const day = today.getDay();
            const diff = day === 0 ? 6 : day - 1; // Monday as start
            const start = new Date(today);
            start.setDate(today.getDate() - diff);
            return { start, end: new Date(now) };
        }
        case 'month': {
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            return { start, end: new Date(now) };
        }
        case 'lastMonth': {
            const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
            return { start, end };
        }
        case 'year': {
            const start = new Date(now.getFullYear(), 0, 1);
            return { start, end: new Date(now) };
        }
        case 'all':
        default:
            return { start: null, end: null };
    }
}

export function filterByDateRange(items, dateRange) {
    if (!dateRange.start && !dateRange.end) return items;
    return items.filter(item => {
        const itemDate = new Date(item.date || item.createdAt);
        if (dateRange.start && itemDate < dateRange.start) return false;
        if (dateRange.end && itemDate > dateRange.end) return false;
        return true;
    });
}

function DateFilter({ activePreset, onPresetChange }) {
    return (
        <DateFilterStyled>
            {PRESETS.map((preset) => (
                <button
                    key={preset.key}
                    className={`preset-btn ${activePreset === preset.key ? 'active' : ''}`}
                    onClick={() => onPresetChange(preset.key)}
                >
                    <i className={`fa-solid ${preset.icon}`}></i>
                    <span>{preset.label}</span>
                </button>
            ))}
        </DateFilterStyled>
    );
}

const DateFilterStyled = styled.div`
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;

    .preset-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.9rem;
        border: 2px solid ${({ theme }) => theme.borderColor};
        border-radius: 12px;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        font-size: 0.78rem;
        font-weight: 600;
        color: ${({ theme }) => theme.textSecondary};
        transition: all 0.25s ease;
        white-space: nowrap;

        i {
            font-size: 0.75rem;
        }

        &:hover {
            border-color: #6C63FF;
            color: #6C63FF;
        }

        &.active {
            background: linear-gradient(135deg, #6C63FF, #5DADE2);
            border-color: transparent;
            color: #fff;
            box-shadow: 0 2px 10px rgba(108, 99, 255, 0.3);
        }
    }

    @media (max-width: 700px) {
        .preset-btn {
            padding: 0.35rem 0.7rem;
            font-size: 0.72rem;

            span {
                display: none;
            }

            i {
                font-size: 0.85rem;
            }
        }
    }
`;

export default DateFilter;
