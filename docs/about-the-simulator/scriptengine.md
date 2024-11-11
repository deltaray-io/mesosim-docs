---
sidebar_label: 'Script Engine'
sidebar_position: 1
---

# Script Engine

:::info

The Script Engine in MesoSim allows describing complex conditions and calculating expressions using the Lua programming language.

:::

You can find extensive documentation of the language syntax in the [official Lua manual](https://www.lua.org/manual/5.4/manual.html#3).

Below is a brief overview of the most commonly used operators you might find helpful when building expressions.

## Arithmetic operations

- `+`: addition
- `-`: subtraction
- `*`: multiplication
- `/`: float division
- `//`: floor division
- `%`: modulo
- `^`: exponentiation
- `-`: unary minus

## Logical operations

Logical operators evaluate to **true** or **false**. Note that `nil` evaluates to `false` in logical operations.

- `and`: true if both operands evaluate to true, false otherwise
- `or`: true if at least one operand evaluates to true, false otherwise
- `not`: negate the input (true → false, false → true)

## Functions

MesoSim exposes the following functions, which can be used in expressions:

- `abs`
- `min`
- `max`
- `random`
- `sqrt`
- `pow`
- `log`
- `ceil`
- `floor`

Using the functions can be done using the generic Lua notation of function calls, e.g.:
```abs(leg_short_delta)```