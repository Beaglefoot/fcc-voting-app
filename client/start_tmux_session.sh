SESSION_NAME="dev"
WINDOW_NAME=$(basename $PWD)
WORKING_DIR="$PWD"
SERVER_DIR="../server"

tmux new-session -d -s $SESSION_NAME
tmux rename-window $WINDOW_NAME
tmux send-keys "yarn start" C-m

tmux split-window -h -t {left}

tmux split-window -v -t {bottom}
tmux send-keys "yarn test --watch" C-m

tmux select-pane -t {right}

tmux new-window -c "$SERVER_DIR" -n server
tmux send-keys "yarn build:live" C-m
tmux split-window -h -t {left} -c "$SERVER_DIR"
tmux split-window -v -t {bottom} -c "$SERVER_DIR"
tmux send-keys "sleep 3" C-m
tmux send-keys "yarn serve" C-m
tmux last-window

tmux attach -t $SESSION_NAME
