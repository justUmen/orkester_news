import { Card, Skeleton, CardContent, CardActions, Typography } from "@mui/material";

// 1 - Main skeleton for the [searchQuery] page
export function PageSkeleton() { //Simple CardNewsSkeleton * 9
  return (
    <>
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
    </>
  )
}

// 2 - Skeleton for the Articles
export function CardNewsSkeleton(){
  return (
    <Card sx={{ width: { xs: '100%', sm: 545 }, height: 530, margin: 'auto', marginBottom: 2, position: 'relative' }}>
      <Skeleton variant="rectangular" height={240} />
      <CardContent sx={{ height: 'calc(530px - 140px - 60px)', overflow: 'auto' }}>
        <Typography gutterBottom variant="h5" component="div"><Skeleton variant="rectangular" height={25} /></Typography>
        <Typography variant="body2" color="text.secondary"><Skeleton variant="rectangular" height={25} /></Typography>
      </CardContent>
      <CardActions sx={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-between', height: '60px' }}>
        <Typography variant="body2" sx={{ position: 'absolute', left: 10, bottom: 10 }}><Skeleton variant="rectangular" /></Typography>
      </CardActions>
    </Card>
  )
}
