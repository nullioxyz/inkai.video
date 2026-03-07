#!/usr/bin/env bash

set -euo pipefail

EXPECTED_TARGET="/var/www/html/inkai/frontend"
TARGET_DIR="${DEPLOY_TARGET_DIR:-}"
RELEASE_ID="${RELEASE_ID:-}"
ARTIFACT_PATH="${ARTIFACT_PATH:-}"
SERVICE_NAME="${SERVICE_NAME:-inkai-frontend.service}"
USER_ID="$(id -u)"
XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/run/user/$USER_ID}"
DBUS_SESSION_BUS_ADDRESS="${DBUS_SESSION_BUS_ADDRESS:-unix:path=$XDG_RUNTIME_DIR/bus}"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

validate_exact_target() {
  [ -n "$TARGET_DIR" ] || fail "DEPLOY_TARGET_DIR is required."
  [ "$TARGET_DIR" = "$EXPECTED_TARGET" ] || fail "Refusing deploy outside $EXPECTED_TARGET."
}

validate_child_path() {
  local path="$1"

  case "$path" in
    "$TARGET_DIR"/*) ;;
    *)
      fail "Path '$path' is outside the allowed deploy directory."
      ;;
  esac
}

validate_exact_target
[ -n "$RELEASE_ID" ] || fail "RELEASE_ID is required."
[ -n "$ARTIFACT_PATH" ] || fail "ARTIFACT_PATH is required."

validate_child_path "$ARTIFACT_PATH"

INCOMING_DIR="$TARGET_DIR/.incoming/$RELEASE_ID"
RELEASES_DIR="$TARGET_DIR/releases"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
CURRENT_LINK="$TARGET_DIR/current"

validate_child_path "$INCOMING_DIR"
validate_child_path "$RELEASES_DIR"
validate_child_path "$RELEASE_DIR"
validate_child_path "$CURRENT_LINK"

[ -f "$ARTIFACT_PATH" ] || fail "Artifact not found at $ARTIFACT_PATH."
[ -d "$TARGET_DIR" ] || fail "Target directory does not exist: $TARGET_DIR."
[ -d "$XDG_RUNTIME_DIR" ] || fail "Missing XDG runtime dir at $XDG_RUNTIME_DIR."
[ -S "$XDG_RUNTIME_DIR/bus" ] || fail "Missing systemd user bus at $XDG_RUNTIME_DIR/bus."

export XDG_RUNTIME_DIR
export DBUS_SESSION_BUS_ADDRESS

mkdir -p "$RELEASES_DIR"
mkdir -p "$INCOMING_DIR"

if [ -e "$RELEASE_DIR" ]; then
  rm -rf "$RELEASE_DIR"
fi

mkdir -p "$RELEASE_DIR"
tar -xzf "$ARTIFACT_PATH" -C "$RELEASE_DIR"

[ -f "$RELEASE_DIR/server.js" ] || fail "Missing server.js in extracted artifact."
[ -d "$RELEASE_DIR/.next/static" ] || fail "Missing .next/static in extracted artifact."

ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"

if command -v systemctl >/dev/null 2>&1; then
  if systemctl --user list-unit-files "$SERVICE_NAME" --no-legend 2>/dev/null | grep -q "^$SERVICE_NAME"; then
    systemctl --user restart "$SERVICE_NAME"
  else
    fail "systemd user service '$SERVICE_NAME' was not found."
  fi
else
  fail "systemctl is required on the target host."
fi

echo "Deploy completed successfully to $TARGET_DIR using release $RELEASE_ID."
