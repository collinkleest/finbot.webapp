import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useUserStore } from '../store';
import { env } from '../environemnt'

function ChatPage() {
//@ts-ignore 
  const user = useUserStore(state => state.user);
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [currThreadId, setCurrThreadId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulated API call to fetch chat threads
  useEffect(() => {
    setThreads(user.threads)
  }, []);

  useEffect(() => {
    if (selectedThread) {
      const fetchMessages = async () => {
        
      };

      fetchMessages();
    }
  }, [selectedThread]);
  //@ts-ignore
  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };

  //@ts-ignore
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // if (!selectedThread) return; // No selected thread, cannot send message

    if (messages.length <= 0) {
        setIsLoading(true)
        fetch(`${env.api_url}/chat/new`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user._id, content: newMessage, role: "user" })}
        ).then(async (data) => {
            setIsLoading(false)
            const jsonData = await data.json()
            setCurrThreadId(jsonData.data[0].thread_id)
            const messages = [];
            for (const msg of jsonData.data){
                messages.push({
                    id: msg?.id,
                    sender: msg?.role,
                    text: msg?.content[0]?.text.value
                })
            }
            //@ts-ignore
            setMessages(messages.reverse())
        })
    } else {
        setIsLoading(true)
        fetch(`${env.api_url}/chat/existing`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ threadId: currThreadId, content: newMessage })}
        ).then(async (data) => {
            setIsLoading(false)
            const jsonData = await data.json()
            const messages = [];
            for (const msg of jsonData.data){
                messages.push({
                    id: msg?.id,
                    sender: msg?.role,
                    text: msg?.content[0]?.text.value
                })
            }
            //@ts-ignore
            setMessages(messages.reverse())
        })
    }

    // Add the new message to the selected thread
    // const updatedThread = {
    //   ...selectedThread,
    //   messages: [...selectedThread.messages, { id: selectedThread.messages.length + 1, text: newMessage, sender: 'user' }]
    // };
    // const updatedThreads = threads.map(thread => (thread.id === selectedThread.id ? updatedThread : thread));
    // setThreads(updatedThreads);
    // setMessages(updatedThread.messages);

    // // Clear the input field
    // setNewMessage('');
  };

  const handleCreateNewThread = () => {
    const newThreadId = threads.length + 1;
    const newThread = { id: newThreadId, name: `Thread ${newThreadId}`, messages: [] };
    //@ts-ignore
    setThreads([...threads, newThread]);
    //@ts-ignore
    setSelectedThread(newThread);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px', height: 'calc(100vh - 40px)', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Threads
            </Typography>
            <List component="nav">
              {threads.map((thread) => (
                <ListItem key={thread} button onClick={() => handleThreadSelect(thread)}>
                  <ListItemText primary={thread} />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary" onClick={handleCreateNewThread} style={{ marginTop: '20px' }}>
              Create New Thread
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={3} style={{ padding: '20px', height: 'calc(100vh - 40px)', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Conversation
            </Typography>
            <div style={{ marginBottom: '20px' }}>
              {messages.map((message) => (
                //@ts-ignore
                <div key={message.id} style={{ marginBottom: '10px' }}>
                    {/* @ts-ignore */}
                  <Typography variant="body1" gutterBottom ><b>{message.sender}</b>: {message.text}</Typography>
                </div>
              ))}
            </div>
            {isLoading ? <CircularProgress color="primary" size={50} style={{ marginRight: '10px' }} /> : null}
            <TextField
              label="Type your message"
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={handleNewMessageChange}
              style={{ marginBottom: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
